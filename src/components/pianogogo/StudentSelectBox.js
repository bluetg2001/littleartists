/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
// native-base
import {Menu} from 'native-base';
// react-native-components
import {TouchableOpacity} from 'react-native';
// icons
import Icon from 'react-native-vector-icons/AntDesign';

function StudentSelectBox(props) {
  const {students, selectStudent, setSelectStudent} = props;
  //   학생 list
  //   const students = props.data.parent.students;

  const [position, setPosition] = useState('auto');

  return (
    <Menu
      // shouldOverlapWithTrigger={shouldOverlapWithTrigger} // @ts-ignore
      placement={position === 'auto' ? undefined : position}
      trigger={triggerProps => {
        return (
          <TouchableOpacity {...triggerProps} style={{marginLeft: 10}}>
            <Icon name="caretdown" size={12} color="#009fe8" />
          </TouchableOpacity>
        );
      }}>
      {students.map((student, key) => (
        <Menu.Item key={key} onPress={() => setSelectStudent(student.name)}>
          {student.name}
        </Menu.Item>
      ))}
    </Menu>
  );
}

export default StudentSelectBox;
