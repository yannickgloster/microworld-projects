# TCD Microworld Projects

This website contains projects created under the supervision of Dr. Brendan Tagney.

# Adding a new project

1. Duplicate `src/projects/template.json` and rename it to be `your-project-name.json`

2. Fill out the details.

   - `id` should be `your-project-name` (the filename without .json)

   - `authorUrl`, `url`, and `repoUrl` are all optional fields

   - `url` refers to the live URL of the project that people can have access to

   - Files can be places a folder you can create at this location: `public/projects/your-project-name` (replacing `your-project-name` with the actual name of your project)

   - These files be put put into the JSON like such: `projects/your-project-name/your-file`

3. Once the new files have been uploaded to GitHub, the site will automatically update.
