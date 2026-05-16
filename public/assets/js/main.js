const API_URL = '/users';

const inputNome  = document.getElementById('input-nome');
const inputEmail = document.getElementById('input-email');
const mensagem   = document.getElementById('mensagem');
const tabela     = document.getElementById('tabela-usuarios');

function exibirMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = tipo;
}

function limparFormulario() {
  inputNome.value  = '';
  inputEmail.value = '';
  exibirMensagem('', '');
}

function renderizarUsuarios(users) {
  tabela.innerHTML = '';

  if (users.length === 0) {
    tabela.innerHTML = '<tr><td colspan="3" style="color:#aaa;text-align:center;">Nenhum usuário cadastrado.</td></tr>';
    return;
  }

  users.forEach(user => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="btn-excluir" onclick="excluirUsuario(${user.id_user})">🗑️</button>
      </td>
    `;
    tabela.appendChild(tr);
  });
}

async function loadUsers() {
  exibirMensagem('Carregando usuários...', 'info');
  try {
    const response = await fetch(API_URL);
    const users = await response.json();
    renderizarUsuarios(users);
    exibirMensagem('', '');
  } catch (error) {
    exibirMensagem('Erro ao carregar usuários.', 'erro');
  }
}

async function salvarUsuario() {
  const name  = inputNome.value.trim();
  const email = inputEmail.value.trim();

  if (!name || !email) {
    exibirMensagem('Preencha o nome e o e-mail antes de salvar.', 'erro');
    return;
  }

  exibirMensagem('Salvando...', 'info');
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    if (!response.ok) {
      exibirMensagem(data.message || 'Erro ao cadastrar.', 'erro');
      return;
    }
    exibirMensagem('Usuário cadastrado com sucesso.', 'sucesso');
    limparFormulario();
    exibirMensagem('Usuário cadastrado com sucesso.', 'sucesso');
    await loadUsers();
  } catch (error) {
    exibirMensagem('Erro ao conectar com o servidor.', 'erro');
  }
}

async function excluirUsuario(id) {
  exibirMensagem('Excluindo...', 'info');
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      exibirMensagem(data.message || 'Erro ao excluir.', 'erro');
      return;
    }
    exibirMensagem('Usuário excluído com sucesso.', 'sucesso');
    await loadUsers();
  } catch (error) {
    exibirMensagem('Erro ao conectar com o servidor.', 'erro');
  }
}

loadUsers();