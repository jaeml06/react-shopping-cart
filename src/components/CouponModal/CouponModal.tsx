import { Suspense, useState } from 'react';
import { Modal } from 'chico-custom-modal';
import styled from 'styled-components';
import CouponModalContent from './CouponModalContent';
import { NoCartItemContainer } from '../CartContent/CartContent';
import { useResetAllCoupons } from '../../recoil/selectors';

const Button = styled.button`
  height: 4.2rem;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1.5rem;
  background: white;

  border: 1px solid rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

function CouponModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const resetAllCoupons = useResetAllCoupons();

  const handleButton = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    resetAllCoupons();
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button onClick={handleButton}>쿠폰적용</Button>
      {isModalOpen && (
        <Modal position="center" size="large" onDimmedClick={handleClose}>
          <Modal.Header>
            <Modal.Title title="쿠폰을 선택해 주세요" />
          </Modal.Header>
          <Modal.Body>
            <Suspense
              fallback={<NoCartItemContainer>Loading...</NoCartItemContainer>}
            >
              <CouponModalContent />
            </Suspense>
          </Modal.Body>
          <Modal.Footer>
            <Modal.Button onClick={handleConfirm}>확인</Modal.Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default CouponModal;
