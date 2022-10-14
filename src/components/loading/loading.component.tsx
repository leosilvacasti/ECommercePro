import { LoadingContainer } from './loadin.styles'
import SyncLoader from 'react-spinners/SyncLoader'

const LoadingComponent = () => {
  return (
    <LoadingContainer>
      <SyncLoader size={30} />
    </LoadingContainer>
  )
}
export default LoadingComponent