import React from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceSelector } from '../recoil/selectors';
import styled from 'styled-components';
import { NotificationIcon } from '../asset';

const TotalAmountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.6rem;
`;

const NotificationIconImg = styled.img`
  width: 1rem;
  height: 1rem;
`;

const InformationMsg = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  gap: 0.4rem;
`;

const TotalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Border = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const TotalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TotalInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalInfoLabel = styled.p`
  font-size: 1.6rem;
  line-height: 1.6rem;
`;

const TotalInfoAmount = styled.p`
  font-size: 2.4rem;
  line-height: 3.475rem;
  text-align: right;
`;

function TotalAmount() {
  const { totalAmount, deliveryFee, calculatedTotalAmount } =
    useRecoilValue(totalPriceSelector);

  return (
    <TotalAmountContainer>
      <InformationMsg>
        <NotificationIconImg src={NotificationIcon} />총 주문 금액은 100,000원
        이상일 경우 무료 배송됩니다.
      </InformationMsg>
      <TotalContent>
        <Border />

        <TotalInfoWrapper>
          <TotalInfoBox>
            <TotalInfoLabel>주문 금액</TotalInfoLabel>
            <TotalInfoAmount>{totalAmount.toLocaleString()}원</TotalInfoAmount>
          </TotalInfoBox>

          <TotalInfoBox>
            <TotalInfoLabel>배송비</TotalInfoLabel>
            <TotalInfoAmount>{deliveryFee.toLocaleString()}원</TotalInfoAmount>
          </TotalInfoBox>
        </TotalInfoWrapper>

        <Border />
      </TotalContent>
      <TotalInfoBox>
        <TotalInfoLabel>총 결제 금액</TotalInfoLabel>
        <TotalInfoAmount>
          {calculatedTotalAmount.toLocaleString()}원
        </TotalInfoAmount>
      </TotalInfoBox>
    </TotalAmountContainer>
  );
}

export default TotalAmount;
