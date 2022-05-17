import {gql} from '@apollo/client';

export const GET_STUDENT_ATTEND_HISTORY = gql`
  mutation GetStudentAttendHistory($studentId: ID!, $hakwonId: ID!) {
    getStudentAttendHistory(studentId: $studentId, hakwonId: $hakwonId) {
      arrivedAt
      leftAt
      date
    }
  }
`;
