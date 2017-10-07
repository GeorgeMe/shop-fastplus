package io.shop.common.utils;

public class CommonUtils {

    /**
     * 对象是否为空
     *
     * @param obj
     * @return
     */
    public static boolean isNullOrEmpty(Object obj) {
        if (obj == null) {
            return true;
        }
        return false;
    }

    /**
     * 判断整数是否大于零
     *
     * @param number
     * @return
     */
    public static boolean isIntThanZero(int number) {
        if (number > 0) {
            return true;
        }
        return false;
    }

}
