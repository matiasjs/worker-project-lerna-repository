import Image from "next/image";
import {
  HomeBannerContainer,
  HomeBannerInputContainer,
  HomeImageBannerContainer,
} from "./styles";
import InputField from "@/components/InputField";
import { AiOutlineSearch } from "react-icons/ai";
import { t } from "i18next";

const HomeBanner = () => {
  return (
    <HomeBannerContainer>
      <HomeImageBannerContainer>
        <Image
          src="/guilds/guild_${plumber-2}.jpg"
          alt="Home banner"
          width={500}
          height={250}
        />
        <p>La ayuda que necesitas, a un click.</p>
      </HomeImageBannerContainer>
      <HomeBannerInputContainer>
        <InputField
          placeholder={t("¿Con qué necesitas ayuda?")}
          type={"text"}
          icon={<AiOutlineSearch />}
          height={50}
        />
      </HomeBannerInputContainer>
    </HomeBannerContainer>
  );
};

export default HomeBanner;
