import { useAppDispatch } from "../hooks/redux.hook";
import { Guilds } from "../models/Guilds";
import { getAllGuilds } from "../redux/slices";
import { get } from "../utilities/http/http.axios.utility";

const guildsService = () => {
  const dispatch = useAppDispatch();

  const _getAllGuilds = async (): Promise<Guilds> => {
    const guilds: Guilds = await get(
      "http://localhost:5000/v1/specializations",
      {}
    );

    dispatch(getAllGuilds(guilds));

    return guilds;
  };

  return { getAllGuilds: _getAllGuilds };
};

export default guildsService;
