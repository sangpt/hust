import React from 'react';
import {
  Layout,
  Table,
  Icon,
  Divider,
  Tabs,
  DatePicker,
  Spin,
  Row,
  Col,
  Tooltip,
} from 'antd';
const TabPane = Tabs.TabPane;
const { RangePicker } = DatePicker;
import axios from 'axios';
import moment from 'moment';
const { Content } = Layout;

const columnsDetail = [{
  title: 'Device id',
  dataIndex: 'device_id',
  key: 'device_id',
}, {
  title: 'Origin Text',
  dataIndex: 'origin_text',
  key: 'origin_text',
  render: (text, record) => {
    return (
      <Tooltip title={record.full_origin_text} >
        { text }
      </Tooltip>
    )
  }
}, {
  title: 'Service name',
  dataIndex: 'service_name',
  key: 'service_name',
}, {
  title: 'Voice name',
  dataIndex: 'voice_name',
  key: 'voice_name',
}, {
  title: 'Start time',
  dataIndex: 'start_time',
  key: 'start_time',
}, {
  title: 'End time',
  dataIndex: 'end_time',
  key: 'end_time',
}, {
  title: 'Input type',
  dataIndex: 'input_type',
  key: 'input_type',
}, {
  title: 'Output type',
  dataIndex: 'output_type',
  key: 'output_type',
}, {
  title: 'Number of words',
  dataIndex: 'number_of_words',
  key: 'number_of_words',
}];

function onChange(value, dateString) {
  console.log('Selected Time: ', value);
  console.log('Formatted Selected Time: ', dateString);
}

function onOk(value) {
  console.log('onOk: ', value);
}

const rangePicker = <RangePicker
  showTime={{ format: 'HH:mm' }}
  format="YYYY-MM-DD HH:mm"
  placeholder={['Start Time', 'End Time']}
  onChange={onChange}
  onOk={onOk}
  defaultValue={[moment().startOf('month'), moment()]}
  format="YYYY-MM-DD"
/>

const spin = <Spin />;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      loading: true,
      topTitleData: {
        total_requests: null,
        success: null,
        error: null,
        average: null
      },
      tableDetailData: [],
      activeKey: "1",
      shouldLoadTableDetail: false,
    }
  }

  loadData = () => {
    axios.get('http://localhost:3000/api/v1/dashboards/table_request.json')
      .then((response) => {
        if(response.status == 200) {
          this.setState({tableData: response.data, loading: false});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    
    axios.get('http://localhost:3000/api/v1/dashboards/top_title.json')
      .then((res) => {
        if (res.status == 200) {
          this.setState({topTitleData: res.data});
        }
      })
  }

  componentWillMount() {
    this.loadData();
  }

  showDetail = (e) => {
    axios.get(`http://localhost:3000/api/v1/dashboards/request_date.json?date=${e.target.innerHTML}`)
      .then((res) => {
        if (res.status == 200) {
          this.setState({activeKey: "2", shouldLoadTableDetail: true, tableDetailData: res.data});
        }
      })
  }

  columns = () => {
    return [{
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <a href="javascript:void(0)" onClick={this.showDetail} >{text}</a>,
    }, {
      title: 'Number Requests',
      dataIndex: 'number_requests',
      key: 'number_requests',
    }, {
      title: 'Success',
      dataIndex: 'success',
      key: 'success',
    }, {
      title: 'Fail',
      dataIndex: 'fail',
      key: 'fail',
    }, {
      title: 'Average',
      dataIndex: 'average',
      key: 'average',
    }, {
      title: 'Total Words',
      dataIndex: 'total_words',
      key: 'total_words',
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    }];
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={6}>
            <Content>
            <Icon type="line-chart" /> Total Requests
              <h1>{ this.state.topTitleData.total_requests }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="check" /> Success
              <h1 style={{ color: 'green' }}>{ this.state.topTitleData.success }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="close" /> Error
              <h1 style={{ color: 'red' }}>{ this.state.topTitleData.error }</h1>
            </Content>
          </Col>
          <Col span={6}>
            <Content>
            <Icon type="calculator" /> Average
              <h1 style={{ color: 'yellow' }}>{ this.state.topTitleData.average }</h1>
            </Content>
          </Col>
        </Row>

        <Content>
          <Tabs defaultActiveKey="1" tabBarExtraContent={rangePicker} activeKey={this.state.activeKey} >
            <TabPane tab="All Request" key="1" >
              {this.state.loading ? spin : <Table
                columns={this.columns()}
                dataSource={this.state.tableData}
                scroll={{x: false, y: false}} />}
            </TabPane>
            <TabPane tab="" key="2">
              {this.state.shouldLoadTableDetail ? <Table
                columns={columnsDetail}
                dataSource={this.state.tableDetailData}
                scroll={{x: true, y: false}} />
                : <h1>Waiting...</h1>
              }
            </TabPane>
          </Tabs>
        </Content>
      </div>
    )
  }
}
