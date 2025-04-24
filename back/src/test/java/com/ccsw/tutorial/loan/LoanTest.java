package com.ccsw.tutorial.loan;

import com.ccsw.tutorial.client.ClientServiceImpl;
import com.ccsw.tutorial.game.GameServiceImpl;
import com.ccsw.tutorial.loan.model.Loan;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LoanTest {

    @Mock
    private LoanRepository loanRepository;

    @InjectMocks
    private LoanServiceImpl loanServiceImpl;

    @InjectMocks
    private ClientServiceImpl clientServiceImpl;
    @InjectMocks
    private GameServiceImpl gameRepoServiceImpl;

    @Test
    public void findAllShouldReturnAllLoans() {

        List<Loan> list = new ArrayList<>();
        list.add(mock(Loan.class));

        when(loanRepository.findAll()).thenReturn(list);

        List<Loan> loans = loanServiceImpl.getAll();

        assertNotNull(loans);
        assertEquals(1, loans.size());
    }

    public static final Long EXISTS_LOAN_ID = 5L;

    @Test
    public void deleteExistsLoanIdShouldDeleteLoan() throws Exception {

        Loan loan = mock(Loan.class);
        when(loanRepository.findById(EXISTS_LOAN_ID)).thenReturn(Optional.of(loan));

        loanRepository.deleteById(EXISTS_LOAN_ID);

        verify(loanRepository).deleteById(EXISTS_LOAN_ID);
    }

  /*    public static final Long CLIENT_ID = 5L;
    public static final Long GAME_ID = 6L;
    public static final Date DATE1 = new Date(2023, 4, 25);
    public static final Date DATE2 = new Date(2023, 4, 30);

  @Test
    public void saveNotExistsLoanIdShouldInsert() {
        LoanDto loanDto = new LoanDto();
        ClientDto clientDto = clientServiceImpl.get(CLIENT_ID);
        loanDto.setClient(clientDto);

        ArgumentCaptor<Loan> loan = ArgumentCaptor.forClass(Loan.class);

        loanServiceImpl.save(loanDto);

        verify(loanRepository).save(loan.capture());

        assertEquals(CLIENT_ID, loan.getValue().getClient());

    }*/
}
