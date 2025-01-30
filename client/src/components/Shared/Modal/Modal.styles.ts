import { styled } from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 52px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.overlay.dim};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.containers.primary};
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 300px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 2px 10px ${({ theme }) => theme.shadows.strong};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
