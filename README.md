# Splitfy Frontend

Finance Manager frontend. The objetive of this application is to help people manage their personal finances keeping track of expenses and controlling agains their monthly budget. 

This project was created using [Mantis Free Template](https://github.com/codedthemes/mantis-free-react-admin-template/tree/main) and run with [Bun](https://bun.sh/).


## Installation and Usage

First install Node.Js and Bun. If you need help check [Bun website](https://bun.sh/). 

Then, install dependencies with the following command:
```
bun install
```

Create `.env` file with the following variables:
```
GENERATE_SOURCEMAP=false
REACT_APP_VERSION=v0.1.0
```

Create API and PostgreSQL container from [compose repo](https://github.com/fernandosjp/puc-rio-compose):
```
docker-compose up db api
```

In the project directory, you can run:

```
bun start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

```
bun test
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

```
bun run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

