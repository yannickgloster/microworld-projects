// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from "fs";

export type Project = {
  id: string;
  title: string;
  image: string;
  description: string;
  author: string;
  authorUrl?: string;
  year: number;
  url?: string;
  thesisUrl: string;
  repoUrl?: string;
  abstract: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const jsonDirectory = path.join(process.cwd(), "src", "projects");
  let projects: Project[] = [];

  const files = await fs.readdir(jsonDirectory);

  for (const file of files) {
    if (file !== "template.json") {
      const fileContents = await fs.readFile(
        jsonDirectory + "/" + file,
        "utf8"
      );
      projects.push(JSON.parse(fileContents));
    }
  }

  projects
    .sort((a, b) => {
      return a.year - b.year;
    })
    .reverse();

  res.status(200).json(projects);
}
