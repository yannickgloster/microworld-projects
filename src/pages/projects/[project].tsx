import { fetcher } from "@/lib/fetcher";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Paper,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import { Project } from "../api/projects";

export default function Project() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<Project[], any, any>(
    "/api/projects",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  const project =
    data && data.find((project) => project.id === router.query.project);

  if (!project) {
    return (
      <>
        <Head>
          <title>Not Found</title>
          <meta name="description" content="TCD Microworld Projects" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <Button
            variant="outlined"
            sx={{ position: "absolute", m: 2 }}
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Button>
          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Project Not Found
              </Typography>
            </Container>
          </Box>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta name="description" content="TCD Microworld Projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Button
          variant="outlined"
          sx={{ position: "absolute", m: 2 }}
          onClick={() => {
            router.push("/");
          }}
        >
          Home
        </Button>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              {project.title}
            </Typography>
            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
              paragraph
              onClick={(e) => {
                if (project.authorUrl) {
                  window.open(project.authorUrl, "_ blank");
                }
              }}
            >
              By {project?.authorUrl ? <u>{project.author}</u> : project.author}{" "}
              in {project.year}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={(e) => {
                  window.open(project.thesisUrl, "_ blank");
                }}
              >
                Thesis PDF
              </Button>
              {project.url && (
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    window.open(project.url, "_ blank");
                  }}
                >
                  Website
                </Button>
              )}
              {project.repoUrl && (
                <Button
                  variant="outlined"
                  onClick={(e) => {
                    window.open(project.repoUrl, "_ blank");
                  }}
                >
                  <GitHubIcon sx={{ mr: 1 }} />
                  Repo
                </Button>
              )}
            </Stack>
          </Container>
        </Box>
        <Container maxWidth="md">
          <Paper elevation={12} sx={{ p: 4 }}>
            <Image
              layout="responsive"
              src={`/${project.image}`}
              width={2560}
              height={1239}
              alt={"Project Image"}
            />
          </Paper>
        </Container>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Paper elevation={12} sx={{ p: 4 }}>
            <Typography
              variant="body1"
              align="left"
              style={{ whiteSpace: "pre-line" }}
            >
              {project.abstract}
            </Typography>
          </Paper>
        </Container>
      </main>
    </>
  );
}
