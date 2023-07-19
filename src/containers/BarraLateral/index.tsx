import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import FiltroCards from '../../components/FiltroCards'
import * as S from './styles'
import { Botao, Campo } from '../../styles'
import * as enums from '../../utils/enum/tarefa'
import { RootReducer } from '../../store'
import { alteraTermo } from '../../store/reducers/filtro'

type Props = {
  mostrarFiltro: boolean
}

const BarraLateral = ({ mostrarFiltro }: Props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { termo } = useSelector((state: RootReducer) => state.filtro)

  return (
    <S.Aside>
      {mostrarFiltro ? (
        <div>
          <div>
            <Campo
              type="text"
              placeholder="Buscar"
              value={termo}
              onChange={(evento: { target: { value: string } }) =>
                dispatch(alteraTermo(evento.target.value))
              }
            />
          </div>
          <S.Filtros>
            <FiltroCards
              valor={enums.Status.PENDENTE}
              criterio="status"
              legenda="pendentes"
            />
            <FiltroCards
              valor={enums.Status.CONCLUIDA}
              criterio="status"
              legenda="concluídas"
            />
            <FiltroCards
              valor={enums.Prioridade.IMPORTANTE}
              criterio="prioridade"
              legenda="importantes"
            />
            <FiltroCards
              valor={enums.Prioridade.URGENTE}
              criterio="prioridade"
              legenda="urgentes"
            />
            <FiltroCards
              valor={enums.Prioridade.NORMAL}
              criterio="prioridade"
              legenda="normais"
            />
            <FiltroCards criterio="todas" legenda="todas" />
          </S.Filtros>
        </div>
      ) : (
        <Botao onClick={() => navigate('/')}>Voltar</Botao>
      )}
    </S.Aside>
  )
}

export default BarraLateral
