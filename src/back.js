function minAtraso(tarefas) {
  tarefas.sort((a, b) => a.deadline - b.deadline);
  
  let tempoAtual = 0;
  let maxAtraso = 0;
  
  tarefas.forEach((tarefa) => {
    tempoAtual += parseInt(tarefa.duration);
    tarefa.atraso = Math.max(0, tempoAtual - parseInt(tarefa.deadline));
    maxAtraso = Math.max(maxAtraso, tarefa.atraso);
  });

  return [tarefas, maxAtraso];
}

export { minAtraso };
