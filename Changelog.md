---


---

<h1 id="changelog">Changelog</h1>
<h2 id="section">[0.0.1] - 2024-10-25</h2>
<h3 id="added">Added</h3>
<ul>
<li>
<p><strong>New Structure in <code>client</code> Directory:</strong></p>
<ul>
<li><code>public/</code>: Directory to store static assets.</li>
<li><code>src/api/AdminApi.ts</code>: Manages admin-related API requests.</li>
<li><code>src/lib/AxiosAdmin.ts</code>: Configures Axios instance for admin-related requests.</li>
<li><code>src/types/index.ts</code>: Shared TypeScript types for client components.</li>
<li><strong>Component Folders in <code>client/src/components</code>:</strong>
<ul>
<li><code>Header</code>: Application header component.</li>
<li><code>Navbar</code>: Navigation bar component.</li>
<li><code>pages</code>: Full-view components, such as <code>Home.tsx</code>.</li>
</ul>
</li>
</ul>
</li>
<li>
<p><strong>New Structure in <code>server</code> Directory:</strong></p>
<ul>
<li><code>controllers/</code>: Added <code>Admin.Controller.ts</code> and <code>Attendance.Controller.ts</code> for handling specific backend logic.</li>
<li><code>middleware/</code>: Added <code>index.ts</code> and <code>RutValidator.ts</code> for middleware.</li>
<li><code>models/</code>: Added models (<code>Active.model.ts</code>, <code>Admin.model.ts</code>, <code>FingerPrint.model.ts</code>, <code>Log.model.ts</code>, <code>User.model.ts</code>) representing entities in the database.</li>
<li><code>routes/</code>: Added <code>router.admin.ts</code> and <code>router.attendance.ts</code> to handle route management for each controller.</li>
</ul>
</li>
</ul>
<h3 id="changed">Changed</h3>
<ul>
<li><strong>Project Organization:</strong>
<ul>
<li>Enhanced modularization by restructuring backend (<code>server</code>) directories and creating new subdirectories (<code>controllers</code>, <code>middleware</code>, <code>models</code>, <code>routes</code>) to improve codebase readability.</li>
<li>Restructured <code>client/src</code> with additional folders for APIs, libraries, types, and reusable components.</li>
</ul>
</li>
<li><strong>README Update:</strong>
<ul>
<li>Updated <code>README.md</code> to reflect the new project structure for version <code>0.0.1</code>.</li>
</ul>
</li>
</ul>
<hr>
<h2 id="initial-commit">[0.0.0] - Initial Commit</h2>
<h3 id="added-1">Added</h3>
<ul>
<li><strong>Basic Project Structure:</strong>
<ul>
<li><code>client/</code> folder including <code>Dockerfile</code>, <code>index.html</code>, and <code>src</code> with basic setup files like <code>App.tsx</code>, <code>components/pages/Home.tsx</code>, <code>index.css</code>, and <code>main.tsx</code>.</li>
<li><code>compose.yaml</code> for orchestrating Docker containers.</li>
<li><code>README.md</code> as initial project documentation.</li>
<li><code>.env</code> files for environment configuration in root and <code>server</code>.</li>
<li><code>server/</code> folder setup with <code>Dockerfile</code>, <code>src/config/db.ts</code>, <code>index.ts</code>, and <code>server.ts</code> for initial server configuration.</li>
</ul>
</li>
</ul>
<pre class=" language-mermaid"><svg id="mermaid-svg-N37PHEOSqmBjzVbw" width="100%" xmlns="http://www.w3.org/2000/svg"><style>#mermaid-svg-N37PHEOSqmBjzVbw{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#000000;}#mermaid-svg-N37PHEOSqmBjzVbw .error-icon{fill:#552222;}#mermaid-svg-N37PHEOSqmBjzVbw .error-text{fill:#552222;stroke:#552222;}#mermaid-svg-N37PHEOSqmBjzVbw .edge-thickness-normal{stroke-width:2px;}#mermaid-svg-N37PHEOSqmBjzVbw .edge-thickness-thick{stroke-width:3.5px;}#mermaid-svg-N37PHEOSqmBjzVbw .edge-pattern-solid{stroke-dasharray:0;}#mermaid-svg-N37PHEOSqmBjzVbw .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-svg-N37PHEOSqmBjzVbw .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-svg-N37PHEOSqmBjzVbw .marker{fill:#666;stroke:#666;}#mermaid-svg-N37PHEOSqmBjzVbw .marker.cross{stroke:#666;}#mermaid-svg-N37PHEOSqmBjzVbw svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#mermaid-svg-N37PHEOSqmBjzVbw .commit-id,#mermaid-svg-N37PHEOSqmBjzVbw .commit-msg,#mermaid-svg-N37PHEOSqmBjzVbw .branch-label{fill:lightgrey;color:lightgrey;font-family:'trebuchet ms',verdana,arial,sans-serif;font-family:var(--mermaid-font-family);}#mermaid-svg-N37PHEOSqmBjzVbw:root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}#mermaid-svg-N37PHEOSqmBjzVbw git{fill:apa;}</style><g></g></svg></pre>

