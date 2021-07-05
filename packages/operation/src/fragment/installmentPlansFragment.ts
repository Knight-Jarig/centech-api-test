import gql from 'graphql-tag';

export const installmentPlansFragment = gql`
  fragment installmentPlansFragment on InstallmentPlanInterface {
    installmentplan_id
    name
    bank_id
    bank {
      bank_id
      bank_image
      icon
      active
      color
      name
    }
    currency
    period
    merchant_rate
    customer_rate
    interest_type
    installment_type
    min_amount
    max_amount
    active
    valid_from
    valid_until
    create
  }
`;
