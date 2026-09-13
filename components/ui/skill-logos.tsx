import * as React from 'react';
import { BiLogoPostgresql } from 'react-icons/bi';
import {
  FaCodeBranch,
  FaDatabase,
  FaDocker,
  FaGit,
  FaGithub,
  FaJava,
  FaNetworkWired,
  FaCuttlefish
} from 'react-icons/fa';
import {
  SiDigitalocean,
  SiDocker,
  SiGithubactions,
  SiHibernate,
  SiIntellijidea,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiVercel,
  SiCplusplus,
  SiGithub,
  SiSocket
} from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Java: FaJava,
  JavaScript: SiJavascript,
  JS: SiJavascript,
  'C++': SiCplusplus,
  C: FaCuttlefish,
  'Spring Boot': SiSpringboot,
  'Spring Security': SiSpringsecurity,
  'REST APIs': FaNetworkWired,
  WebSocket: SiSocket,
  Hibernate: SiHibernate,
  'Spring Data JPA': FaDatabase,
  MySQL: SiMysql,
  PostgreSQL: BiLogoPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  'Docker Compose': FaDocker,
  Nginx: SiNginx,
  'GitHub Actions': SiGithubactions,
  'CI/CD': FaCodeBranch,
  Vercel: SiVercel,
  'DigitalOcean': SiDigitalocean,
  Git: FaGit,
  GitHub: SiGithub,
  Postman: SiPostman,
  'IntelliJ IDEA': SiIntellijidea,
  'VS Code': VscVscode,
  Spring: SiSpring
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = techIcons[name];

  // Pills use small monochrome icons — icons inherit currentColor from their container.
  // Caller (the pill) should set the text color (e.g., text-white/90). Default sizing is small.
  const cls = `${className ?? ''} inline-flex items-center justify-center text-current`;

  return (
    <span className={cls} aria-hidden="true">
      {Icon ? (
        // react-icons render with currentColor by default, size controlled by container CSS
        <Icon className="h-full w-full" />
      ) : (
        // fallback: small monochrome dot
        <svg className="h-full w-full" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="4" cy="4" r="4" />
        </svg>
      )}
    </span>
  );
}
