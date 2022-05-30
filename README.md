# This product is WIP 

## Some Tips
1. Please remember to cd (change directory) into left-n-go <b>"cd left-n-go"</b> before coding on the app
2. Remember to commit and push up to GitHub upon changes
3. To run the react app on local server, use <b>"npm run start"</b>, it should start in localhost:3000 and you can access it from browser
4. Personnal, I use ctrl+C to stop the development server.

## If any issues found, can list below with solution
1. "sh: react-scripts: command not found" ,
<b> Use "npm install" again because when we make fresh clone, there will very likely be no node_modules (since these are .gitignore'd).</b>

2. 'Routes' is not exported from 'react-router-dom' 
<b>Use "npm i react-router-dom@next" </b>

3. Module not found: Can't resolve '@mui/icons-material/FileDownload'
<b>Use "npm install @mui/material @mui/styles" </b>
