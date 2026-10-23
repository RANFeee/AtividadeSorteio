
const participantes = [];
let idEmEdicao = null;

function adicionarParticipante(event) {
    event.preventDefault();

    const input = document.getElementById("input_nome");
    const nome = input.value.trim();
    if (nome.length < 2) {
        alert("Digite um nome com pelo menos 2 caracteres.");
        return;
    }
    if (idEmEdicao !== null) {
        const participante = participantes.find(
            p => p.id === idEmEdicao
        );
        participante.nome = nome;
        idEmEdicao = null;
        document.getElementById("btn_enviar").textContent =
            "Adicionar participante";
    } else {
        const obj = {
            id: participantes.length > 0
                ? Math.max(...participantes.map(p => p.id)) + 1
                : 1,
            nome: nome
        };
        participantes.push(obj);
    }
    input.value = "";
    listar();
}

function listar(sorteadoId = null) {
    const tbody = document.getElementById("lista");
    tbody.innerHTML = "";
    participantes.forEach(p => {
        const tr = document.createElement("tr");

        if (p.id === sorteadoId) {
            tr.classList.add("sorteado", "destaque");
        }

        tr.innerHTML = `
            <td>${p.id}</td>
            <td></td>
            <td>
                <button type="button"
                    onclick="alterarNome(${p.id})">
                    Alterar
                </button>
                <button type="button" onclick="removerParticipante(${p.id})">
                    Remover
                </button>
            </td>
        `;
        tr.children[1].textContent = p.nome;

        tbody.appendChild(tr);
    });
}

function alterarNome(id) {
    const participante = participantes.find(p => p.id === id);
    if (!participante) {
        return;
    }
    const input = document.getElementById("input_nome");
    input.value = participante.nome;
    input.focus();
    idEmEdicao = participante.id;
    document.getElementById("btn_enviar").textContent =
        "Confirmar alteração";
}

function sortear() {
    if (participantes.length === 0) {
        alert("Adicione pelo menos um participante.");
        return;
    }
    const idx = Math.floor(Math.random() * participantes.length);
    const sorteado = participantes[idx];

    listar(sorteado.id);
}

function removerParticipante(id) {
    const idx = participantes.findIndex(p => p.id === id);
    if (idx === -1) {
        return;
    }
    participantes.splice(idx, 1);
    listar();
}


function ordenarNomeCrescente() {
    participantes.sort((a, b) =>
        a.nome.localeCompare(b.nome, "pt-BR")
    );

    listar();
}

function ordenarNomeDecrescente() {
    participantes.sort((a, b) =>
        b.nome.localeCompare(a.nome, "pt-BR")
    );

    listar();
}