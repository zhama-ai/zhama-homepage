#!/bin/bash

# SEO Validation Script for zhama.com
# This script checks if your website is properly configured for search engine optimization

echo "🔍 SEO Validation for zhama.com"
echo "================================"

BASE_URL="https://zhama.com"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check URL status
check_url() {
    local url=$1
    local description=$2
    
    status_code=$(curl -o /dev/null -s -w "%{http_code}" "$url")
    
    if [ "$status_code" -eq 200 ]; then
        echo -e "${GREEN}✓${NC} $description: ${GREEN}$status_code${NC} - $url"
        return 0
    else
        echo -e "${RED}✗${NC} $description: ${RED}$status_code${NC} - $url"
        return 1
    fi
}

# Function to check if content exists
check_content() {
    local url=$1
    local search_term=$2
    local description=$3
    
    if curl -s "$url" | grep -q "$search_term"; then
        echo -e "${GREEN}✓${NC} $description found in $url"
        return 0
    else
        echo -e "${YELLOW}⚠${NC} $description not found in $url"
        return 1
    fi
}

echo -e "${BLUE}1. Checking basic page accessibility...${NC}"
check_url "$BASE_URL" "Homepage"
check_url "$BASE_URL/zh" "Chinese Homepage"
check_url "$BASE_URL/en" "English Homepage"
check_url "$BASE_URL/zh/contact" "Chinese Contact Page"
check_url "$BASE_URL/en/contact" "English Contact Page"
check_url "$BASE_URL/zh/download" "Chinese Download Page"
check_url "$BASE_URL/en/download" "English Download Page"

echo -e "\n${BLUE}2. Checking SEO files...${NC}"
check_url "$BASE_URL/robots.txt" "Robots.txt"
check_url "$BASE_URL/sitemap.xml" "Main Sitemap"
check_url "$BASE_URL/manifest.json" "Web Manifest"

echo -e "\n${BLUE}3. Checking meta tags and structured data...${NC}"
check_content "$BASE_URL/zh" "schema.org" "Schema.org structured data"
check_content "$BASE_URL/zh" "og:title" "Open Graph title"
check_content "$BASE_URL/zh" "twitter:card" "Twitter Card"
check_content "$BASE_URL/zh" "application/ld+json" "JSON-LD structured data"

echo -e "\n${BLUE}4. Checking search engine specific optimizations...${NC}"
check_content "$BASE_URL/zh" "baidu-site-verification" "Baidu verification meta tag"
check_content "$BASE_URL/zh" "google-site-verification" "Google verification meta tag (if configured)"

echo -e "\n${BLUE}5. Checking robots.txt content...${NC}"
if curl -s "$BASE_URL/robots.txt" | grep -q "Sitemap:"; then
    echo -e "${GREEN}✓${NC} Sitemap URL found in robots.txt"
else
    echo -e "${RED}✗${NC} Sitemap URL not found in robots.txt"
fi

if curl -s "$BASE_URL/robots.txt" | grep -q "User-agent: Baiduspider"; then
    echo -e "${GREEN}✓${NC} Baidu specific rules found in robots.txt"
else
    echo -e "${YELLOW}⚠${NC} Baidu specific rules not found in robots.txt"
fi

echo -e "\n${BLUE}6. Testing sitemap structure...${NC}"
if curl -s "$BASE_URL/sitemap.xml" | grep -q "<urlset"; then
    echo -e "${GREEN}✓${NC} Valid sitemap XML structure"
    
    # Count URLs in sitemap
    url_count=$(curl -s "$BASE_URL/sitemap.xml" | grep -c "<url>")
    echo -e "${GREEN}✓${NC} Sitemap contains $url_count URLs"
else
    echo -e "${RED}✗${NC} Invalid or missing sitemap XML structure"
fi

echo -e "\n${BLUE}7. Checking page load times...${NC}"
load_time=$(curl -o /dev/null -s -w "%{time_total}" "$BASE_URL/zh")
if (( $(echo "$load_time < 3.0" | bc -l) )); then
    echo -e "${GREEN}✓${NC} Homepage load time: ${load_time}s (Good)"
else
    echo -e "${YELLOW}⚠${NC} Homepage load time: ${load_time}s (Could be improved)"
fi

echo -e "\n${BLUE}8. Search engine indexing check...${NC}"
echo -e "${YELLOW}ℹ${NC} To check if your site is indexed, run:"
echo "  Google: site:zhama.com"
echo "  Baidu: site:zhama.com"
echo "  Bing: site:zhama.com"

echo -e "\n${BLUE}9. Next steps for faster indexing:${NC}"
echo -e "${YELLOW}📋${NC} Manual tasks to complete:"
echo "  1. Register at Google Search Console (https://search.google.com/search-console/)"
echo "  2. Register at Baidu Ziyuan (https://ziyuan.baidu.com/)"  
echo "  3. Register at Bing Webmaster Tools (https://www.bing.com/webmasters/)"
echo "  4. Add verification codes to src/app/[locale]/layout.tsx"
echo "  5. Add Baidu verification codes to src/components/BaiduSEO.tsx"
echo "  6. Submit sitemaps to all search engines"
echo "  7. Request indexing for important pages"

echo -e "\n${GREEN}✅ SEO validation complete!${NC}"
echo -e "See ${YELLOW}SEARCH_ENGINE_SUBMISSION.md${NC} for detailed submission instructions."
