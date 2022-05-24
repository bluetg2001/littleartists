import {gql} from '@apollo/client';

export const GET_STUDENT_FEE = gql`
  query GetStudentFee($studentId: ID!) {
    getStudentFee(studentId: $studentId) {
      subject
      parentMainPhone
      tuitionMusic
      tuitionArt
      tuitionSpecial
      tuitionOthers
      payDayOfMonth
      notificationStatus
      tuitionMemo
      cashReceipt
    }
  }
`;
