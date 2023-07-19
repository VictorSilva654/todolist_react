import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Tarefa from '../../models/Tarefa'
import * as enums from '../../utils/enum/tarefa'

type TarefasSlice = {
  itens: Tarefa[]
}

const initialState: TarefasSlice = {
  itens: [
    {
      descricao: 'Ir para a academia',
      status: enums.Status.CONCLUIDA,
      prioridade: enums.Prioridade.IMPORTANTE,
      titulo: 'Fazer um treinão cabuloso',
      id: 1
    },
    {
      descricao: 'Estudar',
      status: enums.Status.CONCLUIDA,
      prioridade: enums.Prioridade.URGENTE,
      titulo: 'Fazer o projeto do curso',
      id: 2
    },
    {
      descricao: 'Dar comida para o cahorro',
      status: enums.Status.PENDENTE,
      prioridade: enums.Prioridade.NORMAL,
      titulo: 'Colocar ração no potinho',
      id: 3
    }
  ]
}

const tarefaSlice = createSlice({
  name: 'tarefas',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((tarefa) => tarefa.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Tarefa>) => {
      const indexTarefa = state.itens.findIndex(
        (t: { id: number }) => t.id === action.payload.id
      )
      if (indexTarefa >= 0) {
        state.itens[indexTarefa] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Tarefa, 'id'>>) => {
      const tarefaJaExiste = state.itens.find(
        (tarefa) =>
          tarefa.titulo.toLowerCase() === action.payload.titulo.toLowerCase()
      )

      if (tarefaJaExiste) {
        alert('Essa tarefa já existe')
      } else {
        const ultimaTarefa = state.itens[state.itens.length - 1]

        const tarefaNova = {
          ...action.payload,
          id: ultimaTarefa ? ultimaTarefa.id + 1 : 1
        }
        state.itens.push(tarefaNova)
      }
    },
    alterarStatus: (
      state,
      action: PayloadAction<{ id: number; finalizado: boolean }>
    ) => {
      const indexTarefa = state.itens.findIndex(
        (t: { id: number }) => t.id === action.payload.id
      )
      if (indexTarefa >= 0) {
        state.itens[indexTarefa].status = action.payload.finalizado
          ? enums.Status.CONCLUIDA
          : enums.Status.PENDENTE
      }
    }
  }
})

export const { remover, editar, cadastrar, alterarStatus } = tarefaSlice.actions
export default tarefaSlice.reducer
