    package com.MoneyPlant.dto;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;

    import java.time.LocalDateTime;
    import java.time.LocalTime;
    import java.util.Date;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public class BudgetDto {
        private int budgetMoney;
        private LocalDateTime budgetMonth;
        private Long categoryId;
        private Long userId;
        private String categoryName;
    }