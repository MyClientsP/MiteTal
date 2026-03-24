'use client';
import { useState } from "react";
import FilterSection from "./filterSection";
import FeaturedProject from "./featuredProject";
import ProjectGrid from "./projectGrid";
import EmptyState from "./emptyState";
import { ProjectsData } from "./projectQuery";

interface Props {
  projectsData: ProjectsData;
}

const FilterClient: React.FC<Props> = ({ projectsData }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projectsData.projects.filter(project => {
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProject = filteredProjects[0];
  const gridProjects = filteredProjects.slice(1);

  const handleClearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
  };

  return (
    <>
      <FilterSection 
        categories={projectsData.categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        totalProjects={projectsData.projects.length}
        filteredCount={filteredProjects.length}
        searchTerm={searchTerm}
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {featuredProject && <FeaturedProject project={featuredProject} />}
          {gridProjects.length > 0 && (
            <ProjectGrid projects={gridProjects} selectedCategory={selectedCategory} />
          )}
          {filteredProjects.length === 0 && <EmptyState onClearFilters={handleClearFilters} />}
        </div>
      </section>
    </>
  );
};

export default FilterClient;
