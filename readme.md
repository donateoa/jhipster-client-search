# Develop

Observations:

- During development, we use both `npm run watch-ts` (recompiles application on source changes) and `npm run watch-node` (restarts application on recompilation)
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

# Run the Application
Only starts the application
````
npm run serve (npm start)
````