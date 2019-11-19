import Dom from '@dom'
import api from '@core/api';
import classNames from 'classnames'
import ButtonIcon from '@atoms/ButtonIcon'
import Loading from '@atoms/Loading'
import SearchBox from '@molucules/SearchBox'
import ScrollView from '@molucules/ScrollView'
import ContactItem from '@molucules/ContactItem'
import './styles.scss'


class SidebarLeft extends Dom.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: [],
    }
  }

  async componentWillMount() {
    console.log('componentWillMount');
    try {
      const client = await api();

      const result = await client.invoke({
        '@type': 'getChats',
        offset_chat_id: 0,
        offset_order: '9223372036854775807',
        limit: 100,
      }).finally(() => {
        this.loading = false;
        client.emit('clientUpdate', { '@type': 'clientUpdateDialogsReady' });
      });

      this.setState({
        list: result,
        loading: false,
      })
    } catch (e) {
      console.error('Chats load error', e);
    }
  }

  renderItem = (n, i) => {
    return (
      <ContactItem key={n.value.order} item={n.value} />
    )
  }

  renderLoading = () => {
    return (
      <Loading />
    )
  }

  renderCharts = () => {
    return (
      <div>
        <div className="chat-list__header">
          <ButtonIcon name="menu" onClick={(e) => console.log(e)} />
          <SearchBox />
        </div>
        <ScrollView>
          <div className="chat-list__body">
            {data.map(this.renderItem)}
          </div>
        </ScrollView>
      </div>
    )
  }

  render() {
    const { loading } = this.state;

    let content;

    if (loading) content = this.renderLoading();
    else content = this.renderCharts()

    return (
      <div className={classNames('chat-list', { 'chat-list--loading': loading })}>
        {content}
      </div>
    )
  }
}

export default SidebarLeft;
