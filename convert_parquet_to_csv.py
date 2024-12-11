import pandas as pd
import os
from datetime import datetime, timedelta

# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Set the relative path for the CSV file in the EcoAquatic directory
csv_file_path = os.path.join(current_dir, 'Data', 'species_fishbase.csv')

# Check if the CSV file exists and if it needs to be updated
def needs_update(file_path):
    if not os.path.exists(file_path):
        return True  # File doesn't exist, needs to be updated
    last_modified_time = os.path.getmtime(file_path)
    last_modified_date = datetime.fromtimestamp(last_modified_time)
    return datetime.now() - last_modified_date > timedelta(days=180)  # 180 days = 6 months

# Read the Parquet file from the URL and update the CSV if needed
if needs_update(csv_file_path):
    parquet_url = 'https://fishbase.ropensci.org/fishbase/species.parquet'
    
    # Read the existing CSV file if it exists
    if os.path.exists(csv_file_path):
        existing_df = pd.read_csv(csv_file_path)
        if existing_df.empty:
            print(f"{csv_file_path} is empty; it will be updated with new data.")
    else:
        existing_df = pd.DataFrame()  # Create an empty DataFrame if the CSV does not exist
        print(f"{csv_file_path} does not exist; it will be created.")

    # Read the new data from the Parquet file
    new_df = pd.read_parquet(parquet_url)

    # Check the columns of both DataFrames
    print("Existing DataFrame columns:", existing_df.columns)
    print("New DataFrame columns:", new_df.columns)

    # Determine the unique identifier column
    id_column = 'SpecCode'  # Change this if the unique identifier has a different name

    if id_column not in new_df.columns:
        raise KeyError(f"Column '{id_column}' not found in new DataFrame.")

    # Combine existing data with new data, keeping existing updates
    updated_df = pd.concat([existing_df, new_df]).drop_duplicates(subset=id_column, keep='last')  # Keep the last occurrence

    # Save the combined DataFrame back to the CSV file
    updated_df.to_csv(csv_file_path, index=False)
    print(f"Updated and converted {parquet_url} to {csv_file_path}")
else:
    print(f"{csv_file_path} is up-to-date; no update needed.")