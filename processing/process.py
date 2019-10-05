import csv
import json


csvFilePath = './data/net_salary_per_town_categories.csv'
csvGeo      = './data/name_geographic_information.csv'

toCompute = {
    "salaire_moyen": 2,
    "salaire_moyen_women": 7,
    "salaire_moyen_men": 12,

    "executive": 3,
    "executive_women": 8,
    "executive_men": 13,

    "middle_manager": 4,
    "middle_manager_women": 9,
    "middle_manager_men": 14,
    
    "employee": 5,
    "employee_women": 10,
    "employee_men": 15,

    "worker": 6,
    "worker_women": 11,
    "worker_men": 16,

    "18_25": 17,
    "18_25_women": 20,
    "18_25_men": 23,

    "26_50": 18,
    "26_50_women": 21,
    "26_50_men": 24,

    "50_plus": 19,
    "50_plus_women": 22,
    "50_plus_men": 25
}

folder = "json/"


class ProcessCSV:

    def __init__(self):
        self.regionNames = {}
        # Generation des differentes regions
        with open(csvGeo, 'r') as geoFile:
            readerCSV = csv.reader(geoFile)

            for row in readerCSV:
                print(readerCSV.line_num, end='\r')
                if row[1] not in self.regionNames:
                    self.regionNames[row[1]] = row[2]


    def getCityRegion(self, cityCode):
        with open(csvGeo, 'r') as geoFile:
            region = -1
            readCSV = csv.reader(geoFile)
            for row in readCSV:
                if cityCode == row[10]:
                    region = row[2]
                    break
        return region

    
    def getCityDepartement(cityCode):
        with open(csvGeo, 'r') as geoFile:
            departement = -1
            readCSV = csv.reader(geoFile)
            for row in readCSV:
                if cityCode == row[10]:
                    departement = row[5]
                    break
        return departement


    def storeRegionNames(self):
        with open('json/regions_name.json', 'w') as file:
            json.dump(self.regionNames, file)
        print('Region names stored')


    def calcRegionMeans(self):
        print('Calculating Region Means')
        with open(csvFilePath, "r") as csvFile:
            readCSV = csv.reader(csvFile)

            means = {}
            cityRegions = {}

            for key in toCompute:
                means[key] = {}

            next(readCSV)

            for row in readCSV:
                print(readCSV.line_num, end='\r')
                if row[0][0] == '0':
                    a = self.getCityRegion(row[0][1:])
                else:
                    a = self.getCityRegion(row[0])

                if a != -1:
                    if a in cityRegions:
                        cityRegions[a] += 1
                    else:
                        cityRegions[a] = 1

                if a != -1:
                    for key in toCompute:
                        if a in means[key]:
                            means[key][a] += float(row[toCompute[key]])
                        else:
                            means[key][a] = float(row[toCompute[key]])

            for key in means:
                for region in means[key]:
                    means[key][region] = means[key][region] / cityRegions[region]

            for key in means:
                with open(folder + 'mean_regions_' + key + '.json', 'w') as file:
                    json.dump(means[key], file)
                    

    def calcDepartementMeans(self):
        print('Calculating Departement Means')
        with open(csvFilePath, "r") as csvFile:
            readCSV = csv.reader(csvFile)

            means = {}
            cityDepartement = {}

            for key in toCompute:
                means[key] = {}

            next(readCSV)

            for row in readCSV:
                print(readCSV.line_num, end='\r')
                if row[0][0] == '0':
                    a = self.getCityRegion(row[0][1:])
                else:
                    a = self.getCityRegion(row[0])

                if a != -1:
                    if a in cityDepartement:
                        cityDepartement[a] += 1
                    else:
                        cityDepartement[a] = 1

                if a != -1:
                    for key in toCompute:
                        if a in means[key]:
                            means[key][a] += float(row[toCompute[key]])
                        else:
                            means[key][a] = float(row[toCompute[key]])

            for key in means:
                for departement in means[key]:
                    means[key][departement] = means[key][departement] / cityDepartement[departement]

            for key in means:
                with open(folder + 'mean_departement_' + key + '.json', 'w') as file:
                    json.dump(means[key], file)
