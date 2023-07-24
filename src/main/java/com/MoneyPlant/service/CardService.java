package com.MoneyPlant.service;

import com.MoneyPlant.dto.CardDto;
import com.MoneyPlant.repository.CardRepository;
import com.MoneyPlant.repository.ExpenseRepository;
import com.MoneyPlant.service.jwt.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;


@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class CardService {

    private boolean isFirstExecution = true;
    private final CardRepository cardRepository;
    private final ExpenseRepository expenseRepository;


    @PostConstruct
    public void executeCardCrawlerOnStartup() {
        if (isFirstExecution) {
            executeCardCrawler();
            isFirstExecution = false;
        }
    }

    @Scheduled(cron = "0 0 4 * * ?", zone = "Asia/Seoul") // 매일 새벽 4시에 실행, 1분마다 실행은 cron = "0 */1 * * * ?"
    public void executeCardCrawlerScheduled() {
        executeCardCrawler();
    }

    public void executeCardCrawler() {
        Logger logger = LoggerFactory.getLogger(AuthService.class);
        try {
            cardRepository.deleteAll(); // Delete all data in card_list.

            String pythonCommand;
            String pythonScriptPath;

            // Check the operating system and set the appropriate Python command
            if (System.getProperty("os.name").toLowerCase(Locale.ENGLISH).contains("windows")) {
                // For Windows
                pythonCommand = "python";
                pythonScriptPath = "/python/CardCrolling.py";
            } else {
                // For other systems (Assuming Python3 is available)
                pythonCommand = "python3";
                pythonScriptPath = "/python/CardCrolling.py";
            }

            // Use ClassLoader to get the Python script as a stream
            InputStream pythonScriptStream = getClass().getResourceAsStream(pythonScriptPath);

            // Create a temporary file and write the Python script content to it
            File tempScriptFile = File.createTempFile("CardCrolling", ".py");
            tempScriptFile.deleteOnExit();
            try (OutputStream out = new FileOutputStream(tempScriptFile)) {
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = pythonScriptStream.read(buffer)) != -1) {
                    out.write(buffer, 0, bytesRead);
                }
            } catch (IOException e) {
                logger.error("Failed to create a temporary script file.", e);
                return;
            } finally {
                pythonScriptStream.close();
            }

            ProcessBuilder processBuilder = new ProcessBuilder(pythonCommand, tempScriptFile.getAbsolutePath());
            Process process = processBuilder.start();

            // Read the error stream
            InputStream errorStream = process.getErrorStream();
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(errorStream));
            StringBuilder errorOutput = new StringBuilder();
            String line;
            while ((line = errorReader.readLine()) != null) {
                errorOutput.append(line).append("\n");
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                logger.info("CardCrolling.py execution succeeded.");
            } else {
                logger.error("CardCrolling.py execution failed. Exit code: " + exitCode);
                logger.error("Error output:\n" + errorOutput.toString());
            }
        } catch (InterruptedException | IOException e) {
            throw new RuntimeException(e);
        }
    }


    public List<Map<?,?>> manyTop3CardList(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Map<?, ?>> result = expenseRepository.findTop3CategoriesByUserAndCurrentMonth(userId);
        List<String> categoryNameList = new ArrayList<>();
        List<Map<?,?>> categoryTop1CardList = new ArrayList<>();

        for (Map<?, ?> map : result) {
            String categoryName = (String) map.get("categoryName");
            categoryNameList.add(categoryName);
        }

        for (String categoryName : categoryNameList) {
            Map<?,?> categoryCardDetail = cardRepository.findTop1CardByCategory(categoryName);
            categoryTop1CardList.add(categoryCardDetail);
        }

        return categoryTop1CardList;
    }

    public List<CardDto> manyExpenseTop3Category(UserDetailsImpl userDetails) {
        Long userId = userDetails.getId();
        List<Map<?, ?>> result = expenseRepository.findTop3CategoriesByUserAndCurrentMonth(userId);
        List<String> categoryNameList = new ArrayList<>();

        for (Map<?, ?> map : result) {
            String categoryName = (String) map.get("categoryName");
            System.out.println(categoryName);
            categoryNameList.add(categoryName);
        }
        List<CardDto> findCardList = findDuplicateCardNamesByCategories(categoryNameList);
        return findCardList;
    }


    public List<CardDto> findDuplicateCardNamesByCategories(List<String> categoryNames) {
        List<Object[]> duplicateCards = cardRepository.findDuplicateCardNamesByCategories(categoryNames);
        List<String> duplicateCardNames = new ArrayList<>();
        List<CardDto> cardDtoList = new ArrayList<>();

        for (Object[] result : duplicateCards) {
            String cardName = (String) result[0];
            duplicateCardNames.add(cardName);
        }

        for (String cardName : duplicateCardNames) {
            List<CardDto> cardDtos = cardRepository.findByCardNameAndCardCategoryIn(cardName, categoryNames);
            CardDto mergedCardDto = mergeCardDto(cardDtos);
            cardDtoList.add(mergedCardDto);
        }

        return cardDtoList;
    }

    private CardDto mergeCardDto(List<CardDto> cardDtos) {
        CardDto mergedCardDto = new CardDto();
        mergedCardDto.setCardName(cardDtos.get(0).getCardName());
        mergedCardDto.setCardImg(cardDtos.get(0).getCardImg());
        mergedCardDto.setCardLink(cardDtos.get(0).getCardLink());

        List<String> cardDescList = new ArrayList<>();
        for (CardDto cardDto : cardDtos) {
            cardDescList.add(cardDto.getCardDesc());
        }
        mergedCardDto.setCardDescList(cardDescList);

        return mergedCardDto;
    }

}
