import { ProjectRepository } from "../domain/ProjectRepository";
import { Project } from "../domain/Project";
import { RequestRepository } from "../../Shared/domain/RequestRepository";

export class ProjectsAxiosRepository implements ProjectRepository {
  constructor(private readonly axiosInstace: RequestRepository) {}

  async getMyOwnProjects(accessToken: string): Promise<Project[]> {
    const projects = await this.axiosInstace
      .get("v1/projects/myself", {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => response.data);

    return projects.map((project: any) => Project.fromPrimitives(project));
  }
}
