import {gql} from '@apollo/client';

export const GET_STUDENT_BILLS = gql`
  query PaymintBillsByStudent($studentId: ID!) {
    paymintBillsByStudent(studentId: $studentId) {
      id
      brandId
      hakwonId
      studentId
      yyyymm
      status
      noticeType
      datetimeToSend
      createdAt
      createdBy
      changedAt
      changedBy
      billedAt
      shortUrl
      member
      merchant
      product_nm
      member_nm
      message
      phone
      price
      expire_dt
      student {
        id
        brandId
        hakwonId
        status
        name
        displayName
        payDayOfMonth
        notificationStatus
        cashReceipt
        isActive
        parents {
          id
          phone
          isMain
          relation
          status
        }
      }
      payment {
        id
        brandId
        hakwonId
        apikey
        bill_id
        appr_pay_type
        appr_dt
        appr_origin_dt
        appr_price
        appr_issuer
        appr_issuer_cd
        appr_issuer_num
        appr_acquirer_cd
        appr_acquirer_nm
        appr_num
        appr_origin_num
        appr_monthly
        appr_state
        createdAt
        changedAt
      }
    }
  }
`;
