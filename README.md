# MyTop100Movies API Documentation

## Description

MyTop100Movies is an API-based application that allows users to manage their top 100 movies list. The system identifies and authenticates users based on their IP address.

Base URL: `https://mytop100movies-5f7n.onrender.com/api/v1`

## Endpoints

### Add movie to list

**Endpoint:** `{{baseurl}}/movies`\
**Method:** `POST`

**Parameters:**
```json
{
    "title": "The Super Mario Bros. Movie",
    "genre": "Animation",
    "releasedOn": "2023",
    "rating": "3045",
    "image": "https://www.themoviedb.org/t/p/w220_and_h330_face/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
}
```

### Get all movies in list

**Endpoint:** `{{baseurl}}/movies`\
**Method:** `GET`

### Get one movie in list

**Endpoint:** `{{baseurl}}/movies/:id`\
**Method:** `GET`

### Discover trending movies

**Endpoint:** `{{baseurl}}/discover/page/:pagenumber`\
**Method:** `GET`

### Update a movie in list

**Endpoint:** `{{baseurl}}/movies/:id`\
**Method:** `PATCH`

**Parameters:**
```json
{
    "title": "The Super Mario Bros. Movie 1",
    "genre": "Animation",
    "releasedOn": "2023",
    "rating": "3045",
    "image": "https://www.themoviedb.org/t/p/w220_and_h330_face/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg"
}
```

### Delete a movie from the list

**Endpoint:** `{{baseurl}}/movies/:id`\
**Method:** `DELETE`

## Importing into Postman

To import these API endpoints into Postman, follow the steps below:

1. Open Postman and click on the "Import" button in the top-left corner.
2. In the Import dialog, select the "Raw Text" option.
3. Copy the entire content of this documentation.
4. Paste the copied content into the text field in the Import dialog.
5. Click the "Continue" button.
6. Review the imported collection in Postman and click the "Import" button to finalize the import.

Once imported, you can explore and test the API endpoints within Postman.