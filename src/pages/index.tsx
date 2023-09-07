import Head from "next/head";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Toolbar,
} from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { Project } from "./api/projects";
import pageData from "./homepage.json";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<Project[], any, any>(
    "/api/projects",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>Microworld Projects</title>
        <meta name="description" content="TCD Microworld Projects" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
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
              {pageData.title}
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              {pageData.description}
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
                  window.open(pageData.buttonPrimaryLink, "_ blank");
                }}
              >
                {pageData.buttonPrimaryText}
              </Button>
              <Button
                variant="outlined"
                onClick={(e) => {
                  window.open(pageData.buttonSecondaryLink, "_ blank");
                }}
              >
                {pageData.buttonSecondaryText}
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {data &&
              data.map((project) => (
                <Grid item key={project.id} xs={12} sm={6}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      "&:hover": {
                        boxShadow: "0px 0px 20px 0px rgba(0,0,0,0.2)",
                        transform: "scale(1.02) perspective(0px)",
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/projects/${project.id}`);
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={project.image}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {project.title}
                      </Typography>
                      <Typography>{project.description}</Typography>
                    </CardContent>
                    <CardActions>
                      {project.url && (
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.url, "_ blank");
                          }}
                        >
                          View
                        </Button>
                      )}
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/projects/${project.id}`);
                        }}
                      >
                        More Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
    </>
  );
}
