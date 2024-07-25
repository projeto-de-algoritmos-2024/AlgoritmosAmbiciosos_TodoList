function minAtraso(tarefas) {
    tarefas.sort((a, b) => a.prazo - b.prazo);

    let tempoAtual = 0;
    let maxAtraso = 0;

    tarefas.forEach(tarefa => {
        tempoAtual += tarefa.duracao;
        tarefa.atraso = Math.max(0, tempoAtual-tarefa.prazo);
        maxAtraso = Math.max(maxAtraso,tarefa.atraso);
    });

    return [tarefas,maxAtraso];
}

export { minAtraso };