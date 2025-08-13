// Données simulées, à remplacer par fetch() si tu as un endpoint serveur
const commandes = [
  { code: "ls -la", description: "Liste détaillée des fichiers" },
  { code: "netstat -tuln", description: "Afficher les connexions réseau actives" },
  { code: "top", description: "Afficher les processus en cours" },
];

const requetes = [
  { code: "GPT: Comment sécuriser un réseau WiFi ?", description: "Exemple de requête pour IA GPT" },
  { code: "GPT: Analyser le trafic réseau suspect", description: "Demande d’analyse IA" },
  { code: "GPT: Générer un script Python pour scan réseau", description: "Création script IA" },
];

const commandesList = document.getElementById("commandes-list");
const requetesList = document.getElementById("requetes-list");
const searchInput = document.getElementById("search");
const exportBtn = document.getElementById("exportCSV");

// Fonction pour créer un item dans la liste
function createListItem(item) {
  const li = document.createElement("li");

  const codeSpan = document.createElement("span");
  codeSpan.textContent = item.code;
  codeSpan.classList.add("code");

  const descSpan = document.createElement("span");
  descSpan.textContent = item.description;
  descSpan.classList.add("desc");

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  // Bouton copier
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copier";
  copyBtn.classList.add("copy-btn");
  copyBtn.onclick = () => {
    navigator.clipboard.writeText(item.code).then(() => {
      alert(`Texte copié : ${item.code}`);
    });
  };

  // Bouton exécuter (exemple simple)
  const runBtn = document.createElement("button");
  runBtn.textContent = "Exécuter";
  runBtn.classList.add("run-btn");
  runBtn.onclick = () => {
    // Ici tu peux adapter pour exécuter dans un terminal intégré, ou envoyer à un backend
    alert(`Exécution simulée de : ${item.code}`);
  };

  buttonsDiv.appendChild(copyBtn);
  buttonsDiv.appendChild(runBtn);

  li.appendChild(codeSpan);
  li.appendChild(descSpan);
  li.appendChild(buttonsDiv);

  return li;
}

// Fonction de rendu des listes
function renderLists(filter = "") {
  commandesList.innerHTML = "";
  requetesList.innerHTML = "";

  const f = filter.toLowerCase();

  commandes.filter(c => c.code.toLowerCase().includes(f) || c.description.toLowerCase().includes(f))
    .forEach(c => commandesList.appendChild(createListItem(c)));

  requetes.filter(r => r.code.toLowerCase().includes(f) || r.description.toLowerCase().includes(f))
    .forEach(r => requetesList.appendChild(createListItem(r)));
}

// Recherche en direct
searchInput.addEventListener("input", (e) => {
  renderLists(e.target.value);
});

// Export CSV
exportBtn.addEventListener("click", () => {
  let csv = "Type,Code,Description\n";

  commandes.forEach(c => {
    csv += `"Commande","${c.code.replace(/"/g, '""')}","${c.description.replace(/"/g, '""')}"\n`;
  });
  requetes.forEach(r => {
    csv += `"Requête","${r.code.replace(/"/g, '""')}","${r.description.replace(/"/g, '""')}"\n`;
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "NetSecurePro_IA_Guide.csv";
  a.click();
  URL.revokeObjectURL(url);
});

// Initialisation
renderLists();
