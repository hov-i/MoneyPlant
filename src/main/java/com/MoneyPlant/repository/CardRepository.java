package com.MoneyPlant.repository;

import com.MoneyPlant.dto.CardDto;
import com.MoneyPlant.entity.CardList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Repository
public interface CardRepository extends JpaRepository<CardList, Long> {
    void deleteAll();
    @Transactional
    void deleteByCardName(String cardName);

    @Query("SELECT c FROM CardList c WHERE c.cardName = :cardName AND c.cardCategory IN :cardCategory")
    List<CardDto> findByCardNameAndCardCategoryIn(@Param("cardName") String cardName, @Param("cardCategory") List<String> cardCategory);


    @Query("SELECT c.cardName, COUNT(c.cardName) AS count FROM CardList c WHERE c.cardCategory IN :categories GROUP BY c.cardName HAVING COUNT(c.cardName) > 1")
    List<Object[]> findDuplicateCardNamesByCategories(@Param("categories") List<String> categories);


    @Query(value = "SELECT card_id AS cardId, card_name AS cardName, card_category AS cardCategory, card_desc AS cardDesc, card_img AS cardImg, card_link AS cardLink " +
            "FROM card_list " +
            "WHERE card_category = :categoryName " +
            "LIMIT 1", nativeQuery = true)
    Map<?,?> findTop1CardByCategory(@Param("categoryName") String categoryName);
}
