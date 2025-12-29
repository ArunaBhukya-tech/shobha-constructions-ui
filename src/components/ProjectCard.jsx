import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <div className="project-card">
      {project.name}
    </div>
  );
}
