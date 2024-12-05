import pandas as pd
import os

# Get the current directory of the script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Set the relative paths for the original and transformed CSV files
original_csv_path = os.path.join(current_dir, 'Fish_Data', 'species_fishbase.csv')
transformed_csv_path = os.path.join(current_dir, 'Fish_Data', 'modified_species_fishbase.csv')

# Load the original CSV
if not os.path.exists(original_csv_path):
    raise FileNotFoundError(f"Original file {original_csv_path} does not exist.")

data = pd.read_csv(original_csv_path)

# Check existing columns
print("Existing columns in the DataFrame:", data.columns.tolist())

# Map existing columns to new headers
data['ID'] = range(1, len(data) + 1)  # Renumber IDs starting from 1
data['ScientificName'] = '"' + data['Genus'] + " " + data['Species'] + '"'  # Combine Genus and Species with quotes
data['CommonName'] = '"' + data['FBname'].fillna('') + '"'  # Map FBname to CommonName with quotes

# Combine image-related columns into ImageUrl
image_columns = ['Pic', 'PictureFemale', 'LarvaPic', 'EggPic', 'GoogleImage']
data['ImageUrl'] = '"' + data[image_columns].fillna('').apply(
    lambda row: ', '.join(filter(None, row.astype(str))), axis=1
) + '"'

# Define the complete taxonomy columns in order
taxonomy_columns = [
    'SuperClass', 'Class', 'SubClass', 'InfraClass', 'SuperOrder',
    'Order', 'SubOrder', 'Family', 'SubFamily', 'Genus', 'Species',
    'SpeciesRefNo', 'FamCode', 'GenCode', 'SubGenCode'
]

# Create missing taxonomy columns if they don't exist
for col in taxonomy_columns:
    if col not in data.columns:
        data[col] = ' '
    else:
        data[col] = data[col].fillna(' ')

# Combine taxonomy information into a single Taxonomy column, maintaining order
data['Taxonomy'] = '"' + data[taxonomy_columns].apply(
    lambda row: '; '.join(f"{col}: \"{str(row[col]).strip()}\"" for col in taxonomy_columns),
    axis=1
) + '"'

# Combine DateEntered, DateModified, and DateChecked into ObservationDate
data['ObservationDate'] = '"' + data[['DateEntered', 'DateModified', 'DateChecked']].fillna('').apply(
    lambda row: f'First Observed: "{row[0]}"; Last Modified: "{row[1]}"; Observation Checked: "{row[2]}"',
    axis=1
) + '"'

# Add EconomicImportance as a concatenated string
importance_columns = [
    'ImportanceRef', 'Importance', 'PriceCateg', 'PriceReliability',
    'Remarks7', 'Landings', 'MainCatchingMethod'
]
data['EconomicImportance'] = '"' + data[importance_columns].fillna('').apply(
    lambda row: '; '.join(f"{col}: \"{str(value).strip()}\"" for col, value in zip(importance_columns, row) if pd.notna(value)),
    axis=1
) + '"'

# Add the EcologicalRole column
data['EcologicalRole'] = data.apply(
    lambda row: f'"Diet: "{row["Diet"] if "Diet" in data.columns else ""}"; Trophic Ecology: ""; Direct Ecological Roles: ""',
    axis=1
)

# Convert relevant columns to numeric, coercing errors to NaN
length_columns = ['Length', 'LTypeMaxM', 'LengthFemale', 'LTypeMaxF', 'MaxLengthRef', 'CommonLength', 'LTypeComM', 'CommonLengthF', 'LTypeComF', 'CommonLengthRef']
weight_columns = ['Weight', 'WeightFemale', 'MaxWeightRef']

# Convert Length columns to numeric
data[length_columns] = data[length_columns].apply(pd.to_numeric, errors='coerce')

# Calculate AverageSize from relevant columns
data['AverageSize'] = data[length_columns].mean(axis=1, skipna=True)

# Convert Weight columns to numeric
data[weight_columns] = data[weight_columns].apply(pd.to_numeric, errors='coerce')

# Calculate AverageWeight from relevant columns
data['AverageWeight'] = data[weight_columns].mean(axis=1, skipna=True)

# Ensure 'Habitat' column exists
if 'Habitat' not in data.columns:
    print("'Habitat' column is missing. Creating with default empty values.")
    data['Habitat'] = ''

# Function to map HabitatCategory based on Habitat value
def map_habitat_category(habitat):
    if pd.isna(habitat) or habitat == '':
        return ''
    habitat_lower = habitat.lower()
    if 'fresh' in habitat_lower:
        return 'Freshwater'
    elif 'salt' in habitat_lower or 'marine' in habitat_lower:
        return 'Saltwater'
    elif 'brack' in habitat_lower:
        return 'Brackish Water'
    elif 'polar' in habitat_lower or 'ice' in habitat_lower:
        return 'Ice and Polar'
    elif 'specialised' in habitat_lower:
        return 'Specialised'
    return ''

# Function to map SubHabitat based on HabitatCategory
def map_sub_habitat(category):
    sub_habitat_map = {
        'Freshwater': 'Rivers and Streams, Lakes and Ponds, Wetlands, Groundwater Systems, Glacial and Snowmelt Systems',
        'Saltwater': 'Open Ocean, Coastal Habitats, Coral Reefs, Deep-Sea Habitats',
        'Brackish Water': 'Estuaries, Lagoons, Mangrove Swamps, Tidal Flats',
        'Ice and Polar': 'Polar Seas, Sea Ice Habitats',
        'Specialised': 'Kelp Forests, Rocky Reefs, Submarine Canyons, Blue Holes and Underwater Caves, Salt Lakes and Brine Pools, Anchialine Pools'
    }
    return sub_habitat_map.get(category, '')

# Map HabitatCategory
data['HabitatCategory'] = '"' + data['Habitat'].apply(map_habitat_category) + '"'

# Map SubHabitat based on HabitatCategory
data['SubHabitat'] = '"' + data['HabitatCategory'].str.strip('"').apply(map_sub_habitat) + '"'

# Combine HabitatCategory, SubHabitat, and Description into Habitat column
data['Habitat'] = data.apply(
    lambda row: f'"Category: "{row["HabitatCategory"].strip("")}"; SubHabitat: "{row["SubHabitat"].strip("")}"; Description: "{row["Habitat"]}"',
    axis=1
)

# Convert specific columns to quoted string format
string_columns = ['Threats', 'ConservationActions', 'MigrationPattern', 'Distribution', 
                 'ConservationStatus', 'NativeStatus', 'Behaviour', 'ClimateSensitivity', 
                 'PopulationTrend', 'GeographicalLocation_Continent', 'GeographicalLocation_Country',
                 'GeographicalLocation_BodyOfWater', 'Endemism', 'Diet', 'Lifespan', 'Description',
                 'Adaptations', 'SourceApi', 'TaxonomicAuthority']

for col in string_columns:
    if col in data.columns:
        data[col] = '"' + data[col].fillna('').astype(str) + '"'

# Reorder columns to match the desired structure
desired_columns = [
    'ID', 'ScientificName', 'CommonName', 'Taxonomy', 'ConservationStatus', 'Threats',
    'ConservationActions', 'NativeStatus', 'Behaviour', 'EconomicImportance', 'EcologicalRole',
    'ClimateSensitivity', 'PopulationTrend', 'GeographicalLocation_Continent',
    'GeographicalLocation_Country', 'GeographicalLocation_BodyOfWater', 'Habitat', 'SubHabitat',
    'HabitatCategory', 'MigrationPattern', 'DepthRange', 'TemperatureRange', 'Distribution', 
    'Endemism', 'Diet', 'Lifespan', 'ImageUrl', 'Description', 'Adaptations', 'AverageSize',
    'AverageWeight', 'ObservationDate', 'SourceApi', 'TaxonomicAuthority'
]
data = data.reindex(columns=desired_columns, fill_value='""')  # Empty strings are now quoted

# Save the transformed data back to the transformed CSV file
data.to_csv(transformed_csv_path, index=False)
print(f"Transformed CSV file saved to {transformed_csv_path}")