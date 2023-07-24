import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";
import { ProjectInterface } from "@/types";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

const Home = async () => {
  const data = (await fetchAllProjects()) as ProjectSearch;

  const projects = data?.projectSearch?.edges || [];

  if (projects.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No projects found</p>
      </section>
    );
  }

  console.log(data);
  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>
      <section className="projects-grid">
        {projects.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard />
        ))}
      </section>
      <h1>LoadMore</h1>
    </section>
  );
};

export default Home;
