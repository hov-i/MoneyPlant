package com.MoneyPlant.controller;

import com.MoneyPlant.dto.CardDto;
import com.MoneyPlant.service.CardService;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/cardrecommend")
public class CardController {
    @Autowired
    CardService cardService;

    // 카드 추천
    @GetMapping("")
    public ResponseEntity<List<CardDto>> getCategoryCardList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        List<CardDto> getCategoryCardList = cardService.manyExpenseTop3Category(userDetails);
        return ResponseEntity.ok(getCategoryCardList);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Map<?,?>>> getTop3CardList(@AuthenticationPrincipal UserDetailsImpl userDetails){
        List<Map<?,?>> getTop3CardList = cardService.manyTop3CardList(userDetails);
        return ResponseEntity.ok(getTop3CardList);
    }
}
