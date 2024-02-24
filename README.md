# Job Application Tracker API
**Programmer: Mike Boyle**

## Running the application locally
1. Clone this repo to your computer
1. `cd crud-takehome-challenge-solution`
1. Install dependencies: `npm install`
1. To specify a port to listen on, add a `.env` file to the root of the project and set the `PORT` variable. For example: `PORT=8888`
1. Run the server: `npm start`
1. If the server is running correctly, you should see this response to the `/` health check route:
```
{ data: "Service is running" }
```

## Methods and routes supported by the API
|Method|Route|Notes|
|----|----|----|
|`GET`|`/`|Health check route|
|`GET`|`/applications`|Get all job applications|
|`GET`|`/applications/:id`|Get application by id|
|`POST`|`/applications`|Create an application; returns the created application|
|`PUT`|`/applications/:id`|Update an existing application; returns the updated application|
|`DELETE`|`/applications/:id`|Delete an existing application; returns the application that was deleted|

## Validation

- ids must be positive integers
- `POST` and `PUT` requests must include the `company` and `status` fields. The `url` field is optional (but will be set to `null` if not present).
- `POST` and `PUT` requests should NOT include `id`, `createdAt` or `updatedAt` fields. These will automatically be set by the API.
- No additional fields are allowed.
