const courses = {
  "Fundamentos de la Empresa": ["Contabilidad I", "Administración"],
  "Matemática Aplicada I": ["Matemática Aplicada II", "Tecnología de la Información"],
  "Derecho I": ["Derecho II"],
  "Contabilidad I": ["Contabilidad II"],
  "Administración": ["Gestión de Personas"],
  "Matemática Aplicada II": ["Matemática Aplicada III", "Introducción a la Economía"],
  "Tecnología de la Información": ["Sistemas Informáticos Administrativos"],
  "Derecho II": ["Tributación I"],
  "Contabilidad II": ["Contabilidad III"],
  "Gestión de Personas": ["Comercialización"],
  "Matemática Aplicada III": ["Estadística"],
  "Introducción a la Economía": ["Economía y Finanzas I"],
  "Sistemas Informáticos Administrativos": ["Gestión de Análisis de Datos"],
  "Tributación I": ["Tributación II"],
  "Contabilidad III": ["Contabilidad IV", "Costos I", "Auditoria I"],
  "Comercialización": ["Gestión de Operaciones y Estrategia"],
  "Gestión de Análisis de Datos": ["Auditoria Informática"],
  "Tributación II": ["Tributación III"],
  "Contabilidad IV": ["Contabilidad Aplicada", "Costos II"],
  "Costos I": ["Costos II"],
  "Auditoria I": ["Auditoria II"],
  "Finanzas I": ["Finanzas II"],
  "Inglés I": ["Inglés II"],
  "Contabilidad Aplicada": ["Control de Gestión"],
  "Auditoria II": ["Auditoria III"],
  "Finanzas II": ["Finanzas III"],
  "Control de Gestión": ["Auditoria de Gestión"],
  "Tributación III": ["Auditoria Tributaria"],
  "Inglés III": ["Inglés IV"]
};

const allCourses = [
  // I Semestre
  "Fundamentos de la Empresa", "Metodología de la Investigación", "Habilidades Comunicacionales",
  "Matemática Aplicada I", "Introducción al Medio y Ética", "Derecho I",
  "Estrategias del Aprendizaje", "Habilidades Matemática PADE",
  // II Semestre
  "Contabilidad I", "Administración", "Matemática Aplicada II", "Tecnología de la Información",
  "Derecho II",
  // III Semestre
  "Contabilidad II", "Gestión de Personas", "Matemática Aplicada III",
  "Introducción a la Economía", "Sistemas Informáticos Administrativos", "Tributación I",
  // IV Semestre
  "Contabilidad III", "Comercialización", "Estadística", "Economía",
  "Gestión de Análisis de Datos", "Tributación II",
  // V Semestre
  "Contabilidad IV", "Costos I", "Auditoria I", "Finanzas I", "Inglés I",
  // VI Semestre
  "Contabilidad Aplicada", "Costos II", "Auditoria II", "Finanzas II",
  "Emprendimiento e Innovación", "Inglés II",
  // VII Semestre
  "Control de Gestión", "Auditoria III", "Gestión de Operaciones y Estrategia",
  "Finanzas III", "Tributación III", "Inglés III",
  // VIII Semestre
  "Auditoria de Gestión", "Electivo", "Auditoria Informática", "Auditoria Tributaria", "Inglés IV"
];

const grid = document.getElementById("grid");

const state = {};

allCourses.forEach(course => {
  const div = document.createElement("div");
  div.className = "cell";
  div.innerText = course;
  div.dataset.name = course;
  grid.appendChild(div);

  // Solo los que no tienen requisitos se activan al inicio
  const hasPrereq = Object.values(courses).some(list => list.includes(course));
  if (!hasPrereq) {
    div.classList.add("enabled");
    state[course] = false;
  }
});

// Evento al hacer clic
grid.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell || !cell.classList.contains("enabled") || cell.classList.contains("approved")) return;

  cell.classList.add("approved");
  const course = cell.dataset.name;
  state[course] = true;

  // Desbloquear cursos dependientes
  const dependents = courses[course] || [];
  dependents.forEach(dep => {
    // Validar si todos sus requisitos están aprobados
    const reqs = Object.entries(courses).filter(([k, v]) => v.includes(dep)).map(([k]) => k);
    const allApproved = reqs.every(r => state[r]);
    if (allApproved) {
      const depCell = [...document.querySelectorAll(".cell")].find(c => c.dataset.name === dep);
      if (depCell) {
        depCell.classList.add("enabled");
      }
    }
  });
});

