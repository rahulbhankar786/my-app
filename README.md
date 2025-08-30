
## Setup

- Add .env file at the root of project
- Add 
  ```BASE_URL=BASE_URL=https://app.ticketmaster.com/discovery/v2
    API_KEY= // add a ticket master api key from https://developer-acct.ticketmaster.com/
  ```


## Running the app

- Install the dependencies:

  ```sh
  yarn
  ```

- Build and run iOS and Android development builds:

  ```sh
  yarn ios
  # or
  yarn android
  ```

## Folder Structure
  ```-src
    - App.tsx // Entry point of the app
    - assets 
    - components
    - features // contains all the feature like login and home
    - hoooks
    - i18n // for globalization
    - navigation // navigatore
    - utils // utils functions
    - type.d.ts // type container
```

## Notes

- Implemented globlization for Login form only
- We have 


