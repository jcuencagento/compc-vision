import csv
import json

def csv_to_json(csv_file_path, json_file_path, delimiter='|', encodings=('utf-8', 'latin-1')):
    json_data = []
    for encoding in encodings:
        try:
            with open(csv_file_path, 'r', encoding=encoding) as csv_file:
                csv_reader = csv.DictReader(csv_file, delimiter=delimiter)
                for row in csv_reader:
                    json_data.append(row)
            break
        except UnicodeDecodeError:
            continue

    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json.dump(json_data, json_file, ensure_ascii=False)

# Example usage
csv_file_path = '/home/javierc/Proyectos/tfg-nextjs/public/desc/image_descriptions.csv'
json_file_path = '/home/javierc/Proyectos/tfg-nextjs/public/desc/image_descriptions.json'
csv_to_json(csv_file_path, json_file_path)