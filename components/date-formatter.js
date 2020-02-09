import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import fromUnixTime from 'date-fns/fromUnixTime';

export default props => (
  <span>{formatDistanceToNow(fromUnixTime(props.timestamp, 0))}</span>
);
