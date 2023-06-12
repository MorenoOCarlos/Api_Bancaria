import fs from 'fs';

const ARQUIVO = `${__dirname}/../storage/contas.json`;

let conta = Array();

function loadContas() {

    console.log(ARQUIVO)

    // Verifica se o arquivo existe, caso não exista ele cria
    if (!fs.existsSync(ARQUIVO))
        fs.writeFileSync(ARQUIVO, JSON.stringify([]));

    // Lê o arquivo e adiciona o conteúdo na variável `data`
    const data = fs.readFileSync(ARQUIVO);

    // Converte o conteúdo do arquivo para JSON
    conta = JSON.parse(data.toString());

    return conta;
}

function saveContas(data: any) {
    conta.push({
        id: conta.length + 1,
        ...data
    });

    fs.writeFileSync(ARQUIVO, JSON.stringify(conta));

}

export { loadContas, saveContas };