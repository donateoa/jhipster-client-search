# Develop

Observations:

- During development, we use both `npm run watch-ts` (recompiles application on source changes) and `npm run watch-node` (restarts application on recompilation). `npm run dev` will add Source and Out folder for us.
- `npm run build-ts` only compiles the application
- `npm run serve` (`npm start`) only starts the application

To develop, we run:

```
npm run watch-ts
```

and in a separate terminal we run:
````
npm run watch-node
````
you can set [`projectFolder`,`outputFolder`,`role`,`entityFolder`] environment variables in order to skip some of prompts.
````
projectFolder=/Users/alessandrodonateo/dev/elif/wp-monolith-svc/src/main/webapp/app outputFolder=search role=ROLE_ADMIN entityFolder=client npm run watch-node
````
# Run the Application
Only starts the application
````
npm run serve (npm start)
````