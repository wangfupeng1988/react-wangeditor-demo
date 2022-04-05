import React from 'react'
// import { Modal, Button } from 'antd'
import MyEditor from './components/MyEditor'

function App() {
  // const [isModalVisible, setIsModalVisible] = useState(false)

  // const showModal = () => {
  //   setIsModalVisible(true);
  // }

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // }

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // }

  return (
    <div>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <MyEditor/>
      </Modal> */}

      <MyEditor/>
    </div>
  );
}

export default App;
