# Drone Project

## Contents

- Description
- Getting Started
- APIS
- Cron Jobs

## Description

We have a fleet of 10 drones. A drone is capable of carrying devices, other than cameras, and capable of
delivering small loads. For our use case the load is medications.

## Getting Started

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation of dependencies:

    `npm install`  

To Start Dev Server:

    `npm run dev`  

To Run Test Suite:  

    `npm run test`  


To Visit App:

`localhost:3000`  

## APIs'

### Create Drone API

- **Endpoint**: `/drone`
- **Description**: `This endpoint creates new Drone.`
- **Methods**: `[POST]`
- **Request Body**:
  - `serialNumber *`: serial number of Drone
  - `model *`: model of the Drone and it must be one of [Lightweight, Middleweight, Cruiserweight, Heavyweight]
  - `weightLimit *`: maximum weight loaded on Drone (minimum value is 0 and maximum is 500)
- **Response**:
  ```json
  status : 200
        {
            "message": "Drone Added Successfully"
        }

  status : 400
        {
            "message": "Validation Error"
        }

  status : 500
        {
            "message": "General Error"
        }

### Get Idle Drones API

- **Endpoint**: `/drone/idle`
- **Description**: `This endpoint get idle Drones.`
- **Methods**: `[GET]`
- **Response**:
  ```json
  status : 200
        {
            "data":[
                {
                    "SERIAL_NUMBER": "1",
                    "MODEL": "Lightweight",
                    "WEIGTH_LIMIT": 500,
                    "BATTERY_CAPACITY": 100,
                    "STATE": "IDLE"
                }
            ],
            "message": "Drones Retrieved Successfully"
        }
  status : 500
        {
            "message": "General Error"
        }

### Get Drone By Serial Number API

- **Endpoint**: `/drone/:serialNumber`
- **Description**: `This endpoint get Drone by serial number.`
- **Methods**: `[GET]`
- **Path Parameters**:
  - `serialNumber *`: serial number of Drone
- **Response**:
  ```json
  status : 200
        {
            "data":{
                    "SERIAL_NUMBER": "1",
                    "MODEL": "Lightweight",
                    "WEIGTH_LIMIT": 500,
                    "BATTERY_CAPACITY": 100,
                    "STATE": "IDLE"
                },
            "message": "Drone Retrieved Successfully"
        }

  status : 400
        {
            "message": "Validation Error"
        }

  status : 500
        {
            "message": "General Error"
        }

### Get Drone Medications By Serial Number API

- **Endpoint**: `/drone/:serialNumber/medications`
- **Description**: `This endpoint get Drone medications by serial number.`
- **Methods**: `[GET]`
- **Path Parameters**:
  - `serialNumber *`: serial number of Drone
- **Response**:
  ```json
  status : 200
        {
            "data":[
                {
                    "NAME": "ahmed_13",
                    "WEIGHT": 500,
                    "CODE": "1",
                    "IMAGE": "1.jpeg"
                },
            ],
            "message": "Drone Medications Retrieved Successfully"
        }

  status : 400
        {
            "message": "Validation Error"
        }

  status : 500
        {
            "message": "General Error"
        }

### Load Medications to specific Drone API

- **Endpoint**: `/drone/:serialNumber/medications`
- **Description**: `This endpoint loads medication to specific drone`
- **Methods**: `[POST]`
- **Path Parameters**:
  - `serialNumber *`: serial number of Drone
- **Request Body**:
  - `medicationCode *`: code of loaded medication
- **Response**:
  ```json
  status : 200
        {
            "message": "Drone Medications Loaded Successfully"

        }

  status : 400
        {
            "message": "Validation Error"
        }

  status : 500
        {
            "message": "General Error"
        }

### Create Medication API

- **Endpoint**: `/medication`
- **Description**: `This endpoint creates medication`
- **Methods**: `[POST]`
- **Headers**:
  - `Content-Type`: 'multipart/form-data;'
- **Request Body**:
  - `name *`: name of medication
  - `weight *`: weight of medication
  - `code *`: code of medication
  - `image *`: image of medication
- **Response**:
  ```json
  status : 200
        {
            "message": "Medication Added Successfully"

        }

  status : 400
        {
            "message": "Validation Error"
        }

  status : 500
        {
            "message": "General Error"
        }


## Cron Jobs

  * Create Cron Job which run every minute to check drones battery levels and create audit event log for this