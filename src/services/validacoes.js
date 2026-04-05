export function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validarCPF(cpf) {
  const apenasNumeros = cpf.replace(/\D/g, "");
  if (apenasNumeros.length !== 11) return false;
  if (/^(\d)\1+$/.test(apenasNumeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(apenasNumeros[i]) * (10 - i);
  }
  let digito1 = (soma * 10) % 11;
  if (digito1 === 10 || digito1 === 11) digito1 = 0;
  if (digito1 !== parseInt(apenasNumeros[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(apenasNumeros[i]) * (11 - i);
  }
  let digito2 = (soma * 10) % 11;
  if (digito2 === 10 || digito2 === 11) digito2 = 0;
  return digito2 === parseInt(apenasNumeros[10]);
}

export function validarSenha(senha) {
  if (senha.length < 8) return { valida: false, mensagem: "Senha deve ter ao menos 8 caracteres" };
  if (!/[A-Z]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos uma letra maiúscula" };
  if (!/[0-9]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos um número" };
  if (!/[!@#$%^&*]/.test(senha)) return { valida: false, mensagem: "Senha deve ter ao menos um caractere especial (!@#$%^&*)" };
  return { valida: true, mensagem: "" };
}

export function formatarCPF(cpf) {
  const nums = cpf.replace(/\D/g, "").slice(0, 11);
  return nums
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
